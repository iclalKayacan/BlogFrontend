import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsByCategory, setSelectedCategory } from "./store/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchBlogsByCategory(categoryId));
  };

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
