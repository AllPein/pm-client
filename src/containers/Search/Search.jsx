import { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import * as UI from './Search.styles'

const CHANGE_DEBOUNCE_TIME = 250

const Search = ({
  searchFilter
}) => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  
  // useEffect(
  //   () => {
  //     setSearchValue(searchFilter)
  //   },
  //   [searchFilter]
  // )

  // const setSearch = useCallback(
  //   (value) => {
  //     setFilters({
  //       [DocumentFilterKeys.SEARCH]: value
  //     })
  //   },
  //   [setFilters]
  // )

  // const onSearch = useCallback(
  //   () => {
  //     setSearchvA(searchValue)
  //   },
  //   [
  //     setSearch,
  //     searchValue
  //   ]
  // )

  // const debouncedOnChange = useMemo(
  //   () => debounce(
  //     (e) => {
  //       setSearch(e.target.value)
  //     },
  //     CHANGE_DEBOUNCE_TIME
  //   ),
  //   [setSearch]
  // )

  const onChange = useCallback(
    (e) => {
      // !e.target.value && debouncedOnChange(e)
      setSearchValue(e.target.value)
    },
    [
      setSearchValue
    ]
  )

  return (
    <UI.Wrapper>
      <UI.Input
        allowClear
        onChange={onChange}
        placeholder='Найти'
        suffix={
          (
            <UI.SearchIcon
              // onClick={onSearch}
            />
          )
        }
        value={searchValue}
      />
    </UI.Wrapper>
  )
}
Search.propTypes = {
  searchFilter: PropTypes.string
}

export {
  Search
}
