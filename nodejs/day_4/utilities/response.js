class Utilities {
  static async response(req, res, next, controllerFunction) {
    try {
      const data = await controllerFunction();
      res.json({
        status: 200,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default Utilities;
