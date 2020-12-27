import Select from 'react-select';

const LanguageFilter = ({ options, setFilter }) => {
  return (
    <Select
      style={{ container: { width: 250 } }}
      closeMenuOnSelect={false}
      options={options}
      isMulti
      isClearable
      isSearchable
      onChange={setFilter}
    />
  );
};

export default LanguageFilter;
