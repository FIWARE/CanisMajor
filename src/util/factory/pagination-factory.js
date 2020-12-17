class PaginationFactory {
    findAllResponseObject(response, queryParams) {
      return {
        offset: queryParams.offset,
        limit: queryParams.limit,
        count: response.count,
        records: response.rows
      };
    }
  }
  
  export default new PaginationFactory();