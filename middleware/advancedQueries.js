const advancedQueries = (model, populate) => async (req, res, next) => {
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
    let results
    if (populate)
        results = await model.find(query).select(selected).sort(sortedBy).skip(skipResource).limit(limit).populate(populate)
    else 
        results = await model.find(query).select(selected).sort(sortedBy).skip(skipResource).limit(limit)
    // console.log('hello', results)
    let allResources = await model.countDocuments()
    let currentResources = results.length
    res.advancedQueriesResult = {success: true,allResources, currentResources, data: results}
    next()
  };
  
module.exports = advancedQueries;
