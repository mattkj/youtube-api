import React from 'react';
import PropTypes from 'prop-types';
import {filterList} from '../data';

const Filters = ({filterVideos}) => {
  const printTitle = (group) => {
    if (group.name){
      return <div className="filter-group" key={group.name}>{group.name}</div>
    }
  }

  const printFilters = (group, filterVideos) => {
      return group.filters.map(filter => {
        return <button key={filter} data-filter={filter} onClick={() => filterVideos(filter)}>{filter}</button>
      })
  }

  return(
    <div className='filters'>
      {
        filterList.map(group => {
          return ([
            printTitle(group),
            printFilters(group, filterVideos)
          ])
        })
      }
    </div>
  )
}

Filters.propTypes = {
  filterVideos: PropTypes.func.isRequired
};

export default Filters;