import { useState, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import * as UI from './Search.styles'
import { FilterKeys } from '@/constants/filters'
import { changeFilters } from '@/actions/navigation'

const CHANGE_DEBOUNCE_TIME = 250

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const debouncedSetValue = useMemo(
    () => debounce(
      (value) => {
        dispatch(
          changeFilters({
            [FilterKeys.SEARCH]: value
          })
        )
      },
      CHANGE_DEBOUNCE_TIME
    ),
    [dispatch]
  )

  const onChange = useCallback(
    (e) => {
      const value = e.target.value
      setSearchValue(value)
      debouncedSetValue(value)
    },
    [debouncedSetValue, setSearchValue]
  )

  return (
    <UI.Wrapper>
      <UI.Input
        allowClear
        onChange={onChange}
        placeholder='Найти'
        suffix={
          (
            <UI.SearchIcon />
          )
        }
        value={searchValue}
      />
    </UI.Wrapper>
  )
}

export {
  Search
}
