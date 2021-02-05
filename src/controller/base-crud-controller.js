import generalErrors from '../util/factory/general-errors';
import objectFactory from '../util/factory/object-factory';
import paginationOptions from '../util/factory/pagination-factory';

export default class BaseCRUDController {
  constructor() {
    this.repository = null;
    this.filters = [];
  }

  allEntries(req, res, next) {
    const options = objectFactory.queryOptions(
      req.query,
      this.filters
    );

    return this.repository
      .findAndCountAllByFilter(options)
      .then((entries) => {
        res.status(200).jsonp(paginationOptions.findAllResponseObject(
          entries,
          req.query
        ));
      })
      .catch((err) => {
        res.status(422).jsonp(generalErrors.addErrStatus(err, 422));
      });
  }

  oneSpecifiedEntry(req, res, next) {
    return this.repository
      .findOneById(req.params.id)
      // eslint-disable-next-line consistent-return
      .then((entry) => {
        if (entry) {
          res.status(200).jsonp(entry);
        } else {
          res.status(404).jsonp(generalErrors.notFound());
        }
      })
      .catch((err) => {
        res.status(400).jsonp(generalErrors.addErrStatus(err, 400));

      });
  }

  createEntry(req, res, next) {
    return this.repository.create(req.body)
      .then((entry) => {
        res.status(201).jsonp(entry);
      })
      .catch((err) => {
        res.status(422).jsonp(generalErrors.addErrStatus(err, 422));
      });
  }

  updateEntry(req, res, next) {
    return this.repository.findOneById(req.params.id)
      // eslint-disable-next-line consistent-return
      .then((entry) => {
        if (entry) {
          return this.repository.update(req.params.id, entry, req.body);
        } else {
          res.status(404).jsonp(generalErrors.notFound());
        }
      })
      .then((updatedEntry) => {
        res.status(200).jsonp(updatedEntry);
      })
      .catch((err) => {
        res.status(422).jsonp(generalErrors.addErrStatus(err, 422));
      });
  }

  deleteEntry(req, res, next) {
    return this.repository.findOneById(req.params.id)
      // eslint-disable-next-line consistent-return
      .then((entry) => {
        if (entry) {
          return entry.destroy();
        } else {
          res.status(404).jsonp(generalErrors.notFound());
        }
      }).then(() => {
        res.status(200).jsonp(
          {
            success: true,
            message: 'deleted_successfully'
          }
        );
      })
      .catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          // eslint-disable-next-line no-param-reassign
          err.message = 'SequelizeForeignKeyConstraintError';
          // eslint-disable-next-line no-param-reassign
          err.status = 400;
        }
        res.status(400).jsonp(generalErrors.addErrStatus(err, 400));
      });
  }
}