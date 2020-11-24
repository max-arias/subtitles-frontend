import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Translate } from 'phosphor-react';

import LanguageFilter from './LanguageFilter';

const SubsTable = ({ data }) => {
  const [clickedRows, setClickedRows] = useState([]);
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);

  const memodData = useMemo(() => data, []);

  console.log({ memodData });

  const languageFilterOptions = React.useMemo(() => {
    return [...new Set(memodData.map(item => item.language))].map(item => ({
      value: item,
      label: item,
    }));
  }, []);

  const handleLanguageFilter = values => {
    console.log(values);
  };

  const handleLinkClick = row => {
    setClickedRows(clickedRows => [...new Set([...clickedRows, row.id])]);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark">
                <span>Name</span>
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark">
                <span>Provider</span>
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark w-1/3">
                <span>Language</span>
                <Translate
                  className="inline pl-2 cursor-pointer"
                  size={32}
                  onClick={() => setShowLanguageFilter(!showLanguageFilter)}
                />
                {showLanguageFilter && (
                  <LanguageFilter
                    options={languageFilterOptions}
                    setFilter={handleLanguageFilter}
                  />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {memodData.map(row => {
              return (
                <tr
                  className={classNames(
                    clickedRows.includes(row.id) && 'bg-gray-200 text-gray-400'
                  )}
                  key={row.id}
                >
                  <td className="py-4 px-6 border-b border-grey-light">
                    <a
                      href={row.data.url}
                      href="#"
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default SubsTable;
