const express = require("express");
const router = express.Router();

router.post("/submit", (req, res) => {
  const { fname, lname, city, street, number, cart } = req.body;
  try {
    let total = 0;
    let totalItems = 0;
    cart.map((e) => {
      total += e.amount * e.price;
      totalItems += e.amount;
    });

    console.log(total);
    let wMessage = `
    Hola, mi nombre es ${fname} ${lname},\n
    Reserve estos productos: 
    ${cart.map((e) => `${e.name}`)}.
    Con un total de: $${total}.\nMi direccion de envio es: ${city}, calle: ${street} ${number}.
    Muchas Gracias
    `;

    res.json({
      ok: true,
      message: `total payment: ${total}`,
      link: `https://wa.me/${process.env.PHONE_NUMBER}?text=${encodeURI(
        wMessage
      )}`,
    });
  } catch (e) {
    res.json({
      ok: false,
      message: {
        error: e,
      },
    });
  }
});

module.exports = router;
