const apiFeatures = {
  /**
   * Apply filtering based on query parameters
   * @param {Object} query - Mongoose query object
   * @param {Object} queryParams - Query parameters from request
   * @returns {Object} Modified query object
   */
  filter: (query, queryParams) => {
    const queryObj = { ...queryParams };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    return query.find(JSON.parse(queryStr));
  },

  /**
   * Apply sorting based on sort parameter
   * @param {Object} query - Mongoose query object
   * @param {String} sortParam - Sort parameter from request
   * @returns {Object} Modified query object
   */
  sort: (query, sortParam) => {
    if (sortParam) {
      const sortBy = sortParam.split(",").join(" ");
      return query.sort(sortBy);
    } else {
      return query.sort("-createdAt");
    }
  },

  /**
   * Apply field limiting based on fields parameter
   * @param {Object} query - Mongoose query object
   * @param {String} fieldsParam - Fields parameter from request
   * @returns {Object} Modified query object
   */
  limitFields: (query, fieldsParam) => {
    if (fieldsParam) {
      const fields = fieldsParam.split(",").join(" ");
      return query.select(fields);
    } else {
      return query.select("-__v");
    }
  },

  /**
   * Apply pagination based on page and limit parameters
   * @param {Object} query - Mongoose query object
   * @param {Number} page - Page number
   * @param {Number} limit - Number of items per page
   * @returns {Object} Modified query object
   */
  paginate: (query, page, limit) => {
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    return query.skip(skip).limit(itemsPerPage);
  },

  /**
   * Apply search functionality
   * @param {Object} query - Mongoose query object
   * @param {String} searchParam - Search parameter from request
   * @returns {Object} Modified query object
   */
  search: (query, searchParam) => {
    if (searchParam) {
      const searchRegex = new RegExp(searchParam, "i");
      return query.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { bio: searchRegex },
          { location: searchRegex },
        ],
      });
    }
    return query;
  },
};

export default apiFeatures;
