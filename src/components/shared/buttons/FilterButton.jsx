
import ButtonBase from './ButtonBase';

const FilterButton = ({ setState, state, filter }) => {
  const isActive = state === filter.value;
  
  return (
    <ButtonBase
      onClick={() => setState(filter.value)}
      variant="ghost"
      size="md"
      icon={`fas ${filter.icon}`}
      className={`
        hidden sm:flex flex-grow sm:flex-grow-0 
        font-semibold rounded-3xl
        ${isActive 
          ? "border-blue-500 bg-blue-100 text-blue-600 dark:bg-transparent dark:text-blue-400" 
          : "border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300"
        }
        hover:border-blue-500 hover:bg-blue-100 hover:text-blue-600 
        dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500
      `}
      ariaLabel={`Filter by ${filter.label}`}
    >
      {filter.label}
    </ButtonBase>
  );
};

export default FilterButton;
