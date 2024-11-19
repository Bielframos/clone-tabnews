function status(request, response) {
  response.status(200).json("A aplicação está funcional!");
}

export default status;
