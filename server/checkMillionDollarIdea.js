const checkMillionDollarIdea = (req, res, next) => {
    const weeks = req.body && req.body.numWeeks;
    const revenue = req.body && req.body.weeklyRevenue;
    const profit = Number(weeks) * Number(revenue);
    if (!weeks || !revenue) {
        res.status(400).send();
    }
    else if (profit >= 10000000) {
        next();
        //! This error is still failing, even though next is being passed
    }
    else {
        res.status(400).send();
    }
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
