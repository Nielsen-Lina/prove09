const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function calculate(req, res) {
	var weight = +(req.query.weight);
	var result;
	switch(req.query.mail_type) {
	case "Letters (Stamped)":
	if (weight <= 1) {
		result = "0.50"
	} else if (weight <= 2) {
		result = "0.71"
	} else if (weight <= 3) {
		result = "0.92"
	} else if (weight <= 3.5) {
		result = "1.13"
	} else {
		result = "unknown"
	}
	break;
	case "Letters (Metered)":
	if (weight <= 1) {
		result = "0.47"
	} else if (weight <= 2) {
		result = "0.68"
	} else if (weight <= 3) {
		result = "0.89"
	} else if (weight <= 3.5) {
		result = "1.10"
	} else {
		result = "unknown"
	}
	break;
	case "Large Envelopes (Flats)":
	if (weight <= 1) {
		result = "1.00"
	} else if (weight <= 2) {
		result = "1.21"
	} else if (weight <= 3) {
		result = "1.42"
	} else if (weight <= 4) {
		result = "1.63"
	} else if (weight <= 5) {
		result = "1.84"
	} else if (weight <= 6) {
		result = "2.05"
	} else if (weight <= 7) {
		result = "2.26"
	} else if (weight <= 8) {
		result = "2.47"
	} else if (weight <= 9) {
		result = "2.68"
	} else if (weight <= 10) {
		result = "2.89"
	} else if (weight <= 11) {
		result = "3.10"
	} else if (weight <= 12) {
		result = "3.31"
	} else if (weight <= 13) {
		result = "3.52"
	} else {
		result = "unknown"
	}
	break;
	case "First-Class Package Service - Retail":
	if (weight <= 1) {
		result = "3.50"
	} else if (weight <= 2) {
		result = "3.50"
	} else if (weight <= 3) {
		result = "3.50"
	} else if (weight <= 4) {
		result = "3.50"
	} else if (weight <= 5) {
		result = "3.75"
	} else if (weight <= 6) {
		result = "3.75"
	} else if (weight <= 7) {
		result = "3.75"
	} else if (weight <= 8) {
		result = "3.75"
	} else if (weight <= 9) {
		result = "4.10"
	} else if (weight <= 10) {
		result = "4.45"
	} else if (weight <= 11) {
		result = "4.80"
	} else if (weight <= 12) {
		result = "5.15"
	} else if (weight <= 13) {
		result = "5.50"
	} else {
		result = "unknown"
	}
	break;
	}

	return result
}

function calculateRate(req, res) {
	var weight = req.query.weight
	var type = req.query.mail_type
	var result = calculate(req, res)
	res.render('pages/result', {weight:weight, type:type, result:result})
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/form', (req, res) => res.render('pages/form'))
  .get('/result_service', (req, res) => {
	var result = calculate(req, res)
  	res.json({result:result})	
  })
  .get('/result', function(req, res){
  	calculateRate(req, res)
  })
  .get('/rates', (req, res) => res.render('pages/rates'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
