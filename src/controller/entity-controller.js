import BaseCRUDController from './base-crud-controller';
import EntityRepository from '../repository/entity-repository';

class EntityCRUDController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = EntityRepository;
    this.filters = ['entityId'];
  }

  getAllEntities(request, response) {
  	const query = request.query;
  	const header = request.header;

  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntityById(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;

  	let message = repository.findOneById(request.params.entityId);
  	return response.jsonp(message);
  }

  getEntityByIdAndAttrs(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;

  	let message = "Method in implementation!";
  	return response.jsonp(message);
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
  	const query = request.query;
  	const params = request.params;
  	const header = request.header; 
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByTypeOnlyValue(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByTypeAndAttrs(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByTypeAndAttrsOnlyValues(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
  }

  getEntitiesByAttrs(request, response) {
  	const query = request.query;
  	const params = request.params;
  	const header = request.header;
  		
  	let message = "Method in implementation!";
  	return response.jsonp(message);
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