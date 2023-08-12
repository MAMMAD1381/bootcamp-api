const advancedQueries = (model, findOptions, populate) => async (req, res, next) => {
    let query = {...req.query}
    let reservedTokens = ['select', 'sort', 'page', 'limit']
    let selected, sortedBy, page, limit
    query.select ? selected = query.select.split(',').join(' ') : selected = undefined
    query.sort ? sortedBy = query.sort : sortedBy = 'name'
    query.page ? page = parseInt(query.page, 10) : page = 1
    query.limit ? limit = parseInt(query.limit, 10) : limit = 10
    let skipResource = (page-1) * limit


    reservedTokens.forEach( token => {
        delete query[token]
    } )

    // ? applying req params
    let options = {}
    

    if(findOptions && Object.keys(req.params).length !== 0 ){
        console.log(req.params, req.params.length)
        for(let i = 0; i<findOptions.paths.length; i++ ){
            options[findOptions.paths[i]] = req.params[findOptions.paramsName[i]]
        }
    }

    let results
    if (populate)
        results = await model.find(query).select(selected).sort(sortedBy).skip(skipResource).limit(limit).populate(populate).find(options)
    else 
        results = await model.find(query).select(selected).sort(sortedBy).skip(skipResource).limit(limit).find(options)
    
    let allResources = await model.countDocuments()
    let currentResources = results.length
    res.advancedQueriesResult = {success: true, allResources, currentResources, currentPage:page, data: results}
    next()
  };
  
module.exports = advancedQueries;
