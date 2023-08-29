const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const DefaultError = require('../errors/default-error');
const ForbiddenError = require('../errors/forbidden-error');

// GET Получить все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards)) // статус 200, отправляем карточки
    .catch(() => {
      next(new DefaultError('Произошла ошибка'));
    });
};

// POST Создать карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки.');
      }
      throw new DefaultError('На сервере произошла ошибка');
    })
    .catch(next);
};

// DELETE Удалить карточку
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }

      if (String(card.owner) === req.user._id) {
        Card.deleteOne(card)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new BadRequestError('Передан некорректный _id карточки.');
            }
            throw new DefaultError('На сервере произошла ошибка');
          });
      } else {
        throw new ForbiddenError('Вы не являетесь создателем данной карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Передан некорректный id карточки.');
      }
      throw err;
    })
    .catch(next);
};

// PUT Поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные для постановки лайка.');
      }
      throw err;
    })
    .catch(next);
};

// DELETE Удалить лайк у карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные для снятия лайка.');
      }
      throw err;
    })
    .catch(next);
};
