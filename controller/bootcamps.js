exports.getBootCamps = function (req, res , next){
    res.send('showing all bootCamps')
}

exports.getBootcamp =  function (req, res, next){
    let id = req.params.id
    res.send('showing bootcamp' + id)
}

exports.updateBootcamp = function (req, res, next){
    let id = req.params.id;
    res.send(`updating bootcamp with id: ${id}`)
}

exports.deleteBootcamp = function (req, res, next){
    let id = req.params.id;
    res.send(`deleting bootcamp with id: ${id}`)
}

exports.newBootcamp = function (req, res, next){
    res.send(`adding new bootcamp`)
}