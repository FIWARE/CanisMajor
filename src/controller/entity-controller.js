import BaseCRUDController from './base-crud-controller';
import EntityRepository from '../repository/entity-repository';

class EntityCRUDController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = EntityRepository;
    this.filters = ['entityId'];
  }

  getEntityById(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;

  	return this.repository.findOneById(request.params.entityId)
    .catch((err) => {
        generalErrors.addErrStatus(err, 404);

        return next(err);
    });
  }

  getEntityByIdAndAttrs(request, response, next) {

    const options = objectFactory.queryOptions(
      request.query,
      this.filters
    );

    return this.repository
      .findOneByIdAndAttributes(request.params.entityId, request.params.attrName,options)
      .then((entries) => {
        res.jsonp(paginationOptions.findAllResponseObject(
          entries,
          request.query
        ));
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 404);

        return next(err);
      });
  }

  getEntityByIdAndAttrsOnlyValues(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntityByIdOnlyValues(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByType(request, response) {
    const options = objectFactory.queryOptions(
      request.query,
      this.filters
    );

    return this.repository
      .findAllByType(request.params.entityType,options)
      .then((entries) => {
        res.jsonp(paginationOptions.findAllResponseObject(
          entries,
          request.query
        ));
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 404);

        return next(err);
      });
  }

  getEntitiesByTypeOnlyValue(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByTypeAndAttrs(request, response) {
      const options = objectFactory.queryOptions(
      request.query,
      this.filters
    );

    return this.repository
      .findAllByTypeAndAttributes(request.params.entityType, request.params.attrsName, options)
      .then((entries) => {
        res.jsonp(paginationOptions.findAllResponseObject(
          entries,
          request.query
        ));
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 404);

        return next(err);
      });

  }

  getEntitiesByTypeAndAttrsOnlyValues(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByAttrs(request, response) {
      const options = objectFactory.queryOptions(
      request.query,
      this.filters
    );

    return this.repository
      .findAllByTypeAndAttributes(request.params.attrsName,options)
      .then((entries) => {
        res.jsonp(paginationOptions.findAllResponseObject(
          entries,
          request.query
        ));
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 404);

        return next(err);
      });
  }

  getEntitiesByAttrsOnlyValues(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

}

export default new EntityCRUDController();