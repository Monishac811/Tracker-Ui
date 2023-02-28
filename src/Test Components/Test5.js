import React from 'react'
// import './App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import '../Task Component/table.css';

function Test5() {
  // note: the id field is mandatory
  const items = [
    {
      id: 0,
      name: 'Sathish'
    },
    {
      id: 1,
      name: 'Chetan'
    },
    {
      id: 2,
      name: 'Ajith'
    },
    {
      id: 3,
      name: 'Vaishali'
    },
    {
      id: 4,
      name: 'Monisha'
    },
    {
        id: 5,
        name: 'Amey'
      },
      {
        id: 6,
        name: 'Vivek'
      },
      {
        id: 7,
        name: 'Chaithali'
      }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <div> {item.name}</div>
      </>
    )
  }

  return (
    <div className="App">
      <header>
        <div id="suggestions">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default Test5;