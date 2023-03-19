const generatePagination = (data, chunk) => {
    const dataMap = []
    let countIteration = 1
    let temp = []

    data.forEach((value, i) => {
        temp.push(value)
        if(countIteration >= chunk || data.length === i+1) {
            dataMap.push(temp)
            temp = []
            countIteration = 1
        }
        ++countIteration
    })

    return {
        data: dataMap,
        totalPage: dataMap.length
    }
}

export default generatePagination;
