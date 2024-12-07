// src/pages/SearchPage.js

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce'; // Ensure you have lodash.debounce installed

// ============ Styled Components ============

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: ${({ theme }) => theme.accent};
`;

const Instructions = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const AutocompleteList = styled.ul`
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-top: none;
  max-height: 250px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const AutocompleteItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${({ $highlighted, theme }) => 
    $highlighted ? theme.highlightedBackground : theme.surface};
  color: ${({ $highlighted, theme }) => 
    $highlighted ? theme.highlightedText : theme.text};
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }

  /* Highlight the matching part */
  span.match {
    font-weight: bold;
    background-color: ${({ theme }) => theme.accentLight};
    border-radius: 3px;
    padding: 0 2px;
  }
`;

const SearchButton = styled.button`
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const Message = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
`;

const Error = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.error};
  font-weight: bold;
`;

const DidYouMean = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;

  span {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

const ResultsList = styled.ul`
  padding-left: 0;
  list-style: none;
  margin: 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  cursor: pointer;
  background: ${({ theme }) => theme.surface};
  border-radius: 6px;
  margin-bottom: 1rem;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.hover};
    transform: translateY(-2px);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Chevron = styled.span.attrs((props) => ({
  'aria-expanded': props.$expanded,
}))`
  font-size: 1.5rem;
  transform: rotate(${props => (props.$expanded ? '90deg' : '0deg')});
  transition: transform 0.2s ease;
  color: ${({ theme }) => theme.textSecondary};
`;

const SectionsList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 1rem 0 0 0;
`;

const SectionItem = styled.li`
  cursor: pointer;
  margin-bottom: 0.5rem;
  background: ${({ theme, $selected }) =>
    $selected ? theme.accentLight : theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    box-shadow: ${({ theme }) => theme.hoverShadow};
  }
`;

const SectionContainer = styled.div`
  white-space: pre-wrap;
  background: ${({ theme }) => theme.surface};
  border-radius: 4px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 1rem;
`;

const AdverseReactionsContainer = styled(SectionContainer)`
  background: ${({ theme }) => theme.backgroundSecondary};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.surface};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:disabled {
      background: ${({ theme }) => theme.disabled};
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.secondary};
    }
  }

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
  }
`;

// ============ Helper Functions ============

function formatReadableText(text) {
  if (!text) return 'N/A';
  let readable = text.replace(/•\s+/g, '\n• ');

  let lines = readable.split('\n');
  lines = lines.map(line => {
    if (line.trim().startsWith('•')) {
      return line.replace('•', '<li>') + '</li>';
    }
    return line;
  });

  let joined = lines.join('\n');
  // Convert consecutive <li> into <ul>
  joined = joined.replace(/((?:<li>.*?<\/li>\s*)+)/gs, match => '<ul>' + match.trim() + '</ul>');

  return joined.trim();
}

function formatAdverseReactions(fieldArray) {
  if (!fieldArray || !Array.isArray(fieldArray)) return 'N/A';
  let text = fieldArray.join(' ');

  text = text.replace(/•\s+/g, '\n• ');
  text = text.replace(/\b(6(\.\d+)?[^\n]+)\n?/g, '\n\n#### $1\n\n');
  text = text.replace(/^#### (.*)$/gm, '<h6>$1</h6>');

  let lines = text.split('\n');
  lines = lines.map(line => {
    if (line.trim().startsWith('•')) {
      return line.replace('•', '<li>') + '</li>';
    }
    return `<p>${line.trim()}</p>`;
  });

  let joined = lines.join('\n');
  joined = joined.replace(/(<p><li>.*?<\/li><\/p>\s*)+/gs, match => {
    let listItems = match.replace(/<p>|<\/p>/g, '').trim();
    return `<ul>${listItems}</ul>`;
  });

  joined = joined.replace(/<p>\s*<\/p>/g, '');
  return joined.trim();
}

/**
 * Removes the second occurrence of "warning" (case-insensitive) from the given HTML string.
 */
function removeSecondWarning(html) {
  const lowerHtml = html.toLowerCase();
  const firstIndex = lowerHtml.indexOf('warning');
  if (firstIndex === -1) return html; // no occurrence

  const secondIndex = lowerHtml.indexOf('warning', firstIndex + 7); // search after first occurrence
  if (secondIndex === -1) return html; // only one occurrence

  return html.substring(0, secondIndex) + html.substring(secondIndex + 7);
}

// ============ Example Drug Dictionary for Suggestions ============
const drugDictionary = [
  "Tylenol", "Advil", "Ibuprofen", "Aspirin", "Zyrtec", "Xanax", "Lipitor",
  "Amoxicillin", "Penicillin", "Metformin", "Lisinopril", "Hydroxyzine",
  "Benadryl", "Zoloft", "Atorvastatin", "Acetaminophen", "Prednisone",
  "Wellbutrin", "Humira", "Crestor", "Naproxen", "Celebrex", "Motrin",
  "Aleve", "Voltaren", "Tramadol", "Morphine", "Oxycodone", "Percocet",
  "Codeine", "Fentanyl", "Remicade", "Enbrel", "Neulasta", "Rituxan",
  "Tamiflu", "Tamoxifen", "Gabapentin", "Pregabalin", "Sertraline",
  "Fluoxetine", "Citalopram", "Escitalopram", "Paroxetine", "Venlafaxine",
  "Clonazepam", "Diazepam", "Lorazepam", "Alprazolam", "Buspirone",
  "Carbamazepine", "Valproate", "Lamotrigine", "Levetiracetam",
  "Phenytoin", "Gabapentin", "Pregabalin", "Risperidone", "Olanzapine",
  "Quetiapine", "Aripiprazole", "Clozapine", "Ziprasidone",
  // Add more drug names as needed
];

// Initialize Fuse.js with useMemo to optimize performance
const fuseOptionsConfig = {
  includeScore: true,
  threshold: 0.4, // Adjusted for better autocomplete suggestions
};

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rawTotalResults, setRawTotalResults] = useState(0);
  const limit = 10;
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [expandedSection, setExpandedSection] = useState({});
  const [suggestion, setSuggestion] = useState(null);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const autocompleteRef = useRef(null);
  const suggestionRefs = useRef([]); // Array of refs for each suggestion

  // Initialize Fuse with useMemo
  const fuse = useMemo(() => new Fuse(drugDictionary, fuseOptionsConfig), []);

  const parseQuery = (query) => {
    const parts = query.trim().split(/\s+/);
    const drugName = parts[0] || '';
    const keyword = parts.slice(1).join(' ').toLowerCase();

    let desiredSection = 'all';
    if (keyword.includes('strength')) {
      desiredSection = 'DOSAGE FORMS AND STRENGTHS';
    } else if (keyword.includes('reaction')) {
      desiredSection = 'ADVERSE REACTIONS';
    } else if (keyword.includes('warning')) {
      desiredSection = 'WARNINGS';
    } else if (keyword.includes('usage')) {
      desiredSection = 'INDICATIONS AND USAGE';
    }

    return { drugName, desiredSection };
  };

  const dateRange = 'effective_time:[20200101+TO+20251231]';

  const handleSearch = async (query, page = 1) => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    setSearchResults([]);
    setRawTotalResults(0);
    const skip = (page - 1) * limit;
    const { drugName } = parseQuery(query);

    let result;

    // 1. Exact match attempt
    result = await attemptSearch(drugName, page, skip, false);

    // 2. If exact match not found and no error, try wildcard
    if (!result.found && !result.error) {
      result = await attemptSearch(drugName, page, skip, true);
    }

    // Set error state if there was an error
    if (result.error) {
      setError(result.error);
    }

    // 3. If still no results and no error, provide suggestion
    if (!result.found && !result.error) {
      provideSuggestion(drugName);
    }

    setIsLoading(false);
  };

  const attemptSearch = async (drugName, page, skip, useWildcard) => {
    const wildcard = useWildcard ? '*' : '';
    const finalSearchParam = `${dateRange}+AND+(openfda.brand_name:"${drugName}${wildcard}"+OR+openfda.generic_name:"${drugName}${wildcard}")`;
    const url = `https://api.fda.gov/drug/label.json?search=${finalSearchParam}&limit=${limit}&skip=${skip}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 429) {
          return { found: false, error: 'API rate limit exceeded. Please try again later.' };
        }
        console.warn(`Non-OK response: ${response.status}`);
        return { found: false, error: `Error: Received status code ${response.status}` };
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Remove duplicates (case-insensitive)
        const seen = new Set();
        const uniqueResults = [];
        for (const result of data.results) {
          const drugNames = result.openfda?.brand_name || result.openfda?.generic_name;
          const displayName = drugNames ? drugNames.join(', ') : 'No Name';
          const normalizedName = displayName.toLowerCase().trim();
          if (!seen.has(normalizedName)) {
            seen.add(normalizedName);
            uniqueResults.push(result);
          }
        }

        setRawTotalResults(data.meta.results.total);
        setSearchResults(uniqueResults);
        setCurrentPage(page);
        return { found: true, error: null };
      }
      return { found: false, error: null };
    } catch (err) {
      console.error('Error fetching data:', err);
      return { found: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const provideSuggestion = (query) => {
    const results = fuse.search(query);
    if (results.length > 0) {
      setSuggestion(results[0].item);
    } else {
      setSuggestion(null);
      setError('No results found.');
    }
  };

  const handleNextPage = () => {
    if (currentPage * limit < rawTotalResults) {
      handleSearch(currentSearchQuery, currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSearch(currentSearchQuery, currentPage - 1);
    }
  };

  const formatField = (fieldArray) => {
    if (!fieldArray || !Array.isArray(fieldArray)) return 'N/A';
    let text = fieldArray.join(' ');
    return formatReadableText(text);
  };

  const getSectionsData = (result) => {
    const dosageInfo = result.dosage_forms_and_strengths
      ? formatField(result.dosage_forms_and_strengths)
      : result.dosage_and_administration
        ? formatField(result.dosage_and_administration)
        : 'N/A';

    const indications = formatField(result.indications_and_usage);

    let warnings = formatField(result.warnings);
    warnings = removeSecondWarning(warnings);

    let adverseReactions = 'N/A';
    if (result.adverse_reactions) {
      adverseReactions = formatAdverseReactions(result.adverse_reactions);
    }

    const contraindications = formatField(result.contraindications);

    return {
      "DOSAGE FORMS AND STRENGTHS": { label: "Available Dosages", content: dosageInfo, container: SectionContainer },
      "INDICATIONS AND USAGE": { label: "Indications & Usage", content: indications, container: SectionContainer },
      "WARNINGS": { label: "Warnings", content: warnings, container: SectionContainer },
      "ADVERSE REACTIONS": { label: "Adverse Reactions", content: adverseReactions, container: AdverseReactionsContainer },
      "CONTRAINDICATIONS": { label: "Contraindications", content: contraindications, container: SectionContainer }
    };
  };

  const renderSectionContent = (sections, itemIndex, sectionKey) => {
    const Container = sections[sectionKey].container || SectionContainer;
    return (
      <Container key={sectionKey}>
        <strong>{sections[sectionKey].label}:</strong>{' '}
        <div
          style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}
          dangerouslySetInnerHTML={{ __html: sections[sectionKey].content }}
        />
      </Container>
    );
  };

  const handleKeyDown = (e) => {
    if (autocompleteSuggestions.length === 0) return;

    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < autocompleteSuggestions.length) {
        e.preventDefault();
        selectSuggestion(autocompleteSuggestions[highlightedIndex]);
      } else {
        triggerSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex >= autocompleteSuggestions.length ? 0 : nextIndex;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        const nextIndex = prev - 1;
        return nextIndex < 0 ? autocompleteSuggestions.length - 1 : nextIndex;
      });
    } else if (e.key === 'Escape') {
      setAutocompleteSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const triggerSearch = () => {
    setExpandedItem(null);
    setExpandedSection({});
    setCurrentSearchQuery(searchQuery);
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery, 1);
      setAutocompleteSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestedQuery) => {
    setSearchQuery(suggestedQuery);
    setCurrentSearchQuery(suggestedQuery);
    handleSearch(suggestedQuery, 1);
    setAutocompleteSuggestions([]);
    setHighlightedIndex(-1);
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setCurrentSearchQuery(suggestion);
    handleSearch(suggestion, 1);
    setAutocompleteSuggestions([]);
    setHighlightedIndex(-1);
  };

  // ============ Debounced Input Change Handler ============
  const debouncedHandleInputChange = useMemo(() => debounce((value) => {
    if (value.trim() === '') {
      setAutocompleteSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    const results = fuse.search(value);
    const suggestions = results.slice(0, 5).map(result => result.item);
    setAutocompleteSuggestions(suggestions);
    // Automatically highlight the top suggestion
    setHighlightedIndex(suggestions.length > 0 ? 0 : -1);
  }, 300), [fuse]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedHandleInputChange(value);
  };

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setAutocompleteSuggestions([]);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll the highlighted suggestion into view
  useEffect(() => {
    if (highlightedIndex === -1 || !suggestionRefs.current[highlightedIndex]) return;
    suggestionRefs.current[highlightedIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [highlightedIndex]);

  return (
    <Container>
      <Title>Search FDA Drug Labeling</Title>
      <Instructions>
        Enter a brand or generic drug name and press Enter or click "Search".
      </Instructions>

      <SearchBarContainer ref={autocompleteRef}>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter drug name..."
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `autocomplete-item-${highlightedIndex}` : undefined
          }
        />
        {autocompleteSuggestions.length > 0 && (
          <AutocompleteList id="autocomplete-list" role="listbox">
            {autocompleteSuggestions.map((suggestion, index) => {
              // Highlight matching substring
              const regex = new RegExp(`(${searchQuery})`, 'i');
              const parts = suggestion.split(regex);
              return (
                <AutocompleteItem
                  key={index}
                  id={`autocomplete-item-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  $highlighted={highlightedIndex === index}
                  onMouseDown={() => selectSuggestion(suggestion)} // Use onMouseDown to prevent blur
                  ref={el => suggestionRefs.current[index] = el}
                >
                  {parts.map((part, i) => 
                    regex.test(part) ? <span key={i} className="match">{part}</span> : part
                  )}
                </AutocompleteItem>
              );
            })}
          </AutocompleteList>
        )}
        <SearchButton
          onClick={triggerSearch}
          disabled={searchQuery.trim() === ''}
        >
          Search
        </SearchButton>
      </SearchBarContainer>

      {isLoading && <Message>Loading data, please wait...</Message>}
      {error && <Error>Error: {error}</Error>}

      {!isLoading && !error && searchQuery.trim() === '' && (
        <Message>Please enter a search query above.</Message>
      )}

      {!isLoading && !error && searchQuery.trim() !== '' && searchResults.length === 0 && suggestion && (
        <DidYouMean>
          Did you mean <span onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</span>?
        </DidYouMean>
      )}

      {!isLoading && !error && searchQuery.trim() !== '' && searchResults.length === 0 && !suggestion && (
        <Message>No recent results found for your query.</Message>
      )}

      {!isLoading && !error && searchResults.length > 0 && (
        <>
          <ResultsContainer>
            <ResultsList>
              {searchResults.map((result, index) => {
                const isExpanded = expandedItem === index;
                const drugNames = result.openfda?.brand_name || result.openfda?.generic_name;
                const displayName = drugNames ? drugNames.join(', ') : 'No Name';
                const sections = getSectionsData(result);

                return (
                  <ListItem
                    key={index}
                    onClick={() => {
                      if (expandedItem === index) {
                        setExpandedItem(null);
                        setExpandedSection({});
                      } else {
                        setExpandedItem(index);
                        setExpandedSection({});
                      }
                    }}
                  >
                    <ItemHeader>
                      <strong>{displayName}</strong>
                      <Chevron $expanded={isExpanded}>▶</Chevron>
                    </ItemHeader>
                    {isExpanded && (
                      <SectionsList>
                        {Object.keys(sections).map(sectionKey => {
                          const selected = expandedSection[index] === sectionKey;
                          return (
                            <React.Fragment key={sectionKey}>
                              <SectionItem
                                $selected={selected}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedSection(prev => ({
                                    ...prev,
                                    [index]: prev[index] === sectionKey ? null : sectionKey
                                  }));
                                }}
                              >
                                {sections[sectionKey].label}
                              </SectionItem>
                              {selected && renderSectionContent(sections, index, sectionKey)}
                            </React.Fragment>
                          );
                        })}
                      </SectionsList>
                    )}
                  </ListItem>
                );
              })}
            </ResultsList>

            {rawTotalResults > limit && (
              <Pagination>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage * limit >= rawTotalResults}
                >
                  Next
                </button>
              </Pagination>
            )}
          </ResultsContainer>
        </>
      )}
    </Container>
  );
}

// Ensure export is outside the function
export default SearchPage;
