const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
	apiKey: '94706be9dc9d4a98be5845a49e3e446c' 

});


const handleApiCall = (req, res) => {
	clarifaiApp.models
	.predict(
		Clarifai.FACE_DETECT_MODEL,
		req.body.input
		)
	.then(response => res.json(response))
	.catch(err => res.status(400).json())
}



module.exports= {
	handleApiCall
}