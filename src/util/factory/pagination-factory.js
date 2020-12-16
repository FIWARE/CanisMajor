class PaginationFactory {
    findAllResponseObject(response, queryParams) {
      return {
        pageNumber: queryParams.page,
        pageSize: queryParams.perPage,
        totalRecordCount: response.count,
        records: response.rows
      };
    }
  }
  
  export default new PaginationFactory();