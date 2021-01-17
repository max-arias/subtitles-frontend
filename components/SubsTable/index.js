import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Translate } from 'phosphor-react';
import Tooltip from 'rc-tooltip';
import { PROVIDERS } from '../../utils/constants';

import LanguageFilter from './LanguageFilter';

import 'rc-tooltip/assets/bootstrap_white.css';

const filterList = (data, filterValues) => {
  let output = data;

  if (filterValues?.length) {
    output = data.filter(item => filterValues.includes(item.language));
  }

  return _.orderBy(output, ['language', 'data.score'], ['asc', 'desc']);
};

const buildUrl = data => {
  if (data.provider === 'opensubtitles') {
    return data.data.url;
  }

  const host = PROVIDERS[data.provider];
  return `${host}${data.data.url}`;
};

const SubsTable = ({ data }) => {
  const [clickedRows, setClickedRows] = useState([]);
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [subtitleList, setSubtitleList] = useState([]);

  const originalData = useMemo(() => data, []);

  const languageFilterOptions = useMemo(() => {
    return [...new Set(originalData.map(item => item.language))].map(item => ({
      value: item,
      label: item,
    }));
  }, []);

  const handleLanguageFilter = values => {
    setSelectedLanguages(values?.map(item => item.value));
  };

  const handleLinkClick = row => {
    setClickedRows(clickedRows => [...new Set([...clickedRows, row.id])]);
  };

  useEffect(() => {
    setSubtitleList(filterList(originalData, selectedLanguages));
  }, [selectedLanguages]);

  return (
    <div className="bg-white shadow-md rounded">
      <table className="text-left w-full">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark">
              <span>Name</span>
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark">
              <span>Provider</span>
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark">
              <span>Language</span>

              <Tooltip
                className="bg-white opacity-100"
                placement="left"
                trigger={['click']}
                overlayStyle={{
                  width: 200,
                }}
                overlay={
                  <LanguageFilter
                    options={languageFilterOptions}
                    setFilter={handleLanguageFilter}
                  />
                }
              >
                <Translate
                  className="inline pl-2 cursor-pointer"
                  size={32}
                  onClick={() => setShowLanguageFilter(!showLanguageFilter)}
                />
              </Tooltip>
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {subtitleList.map(row => {
            return (
              <tr
                className={classNames(
                  clickedRows.includes(row.id) && 'bg-gray-200 text-gray-400'
                )}
                key={row.id}
              >
                <td className="py-4 px-6 border-b border-grey-light">
                  <a
                    href={buildUrl(row)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => handleLinkClick(row)}
                  >
                    {row.data.filename}
                  </a>
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.provider}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.language}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.data.score}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default SubsTable;
