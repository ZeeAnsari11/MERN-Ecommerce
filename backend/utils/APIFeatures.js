export const search = (data, key, value) => {
    console.log(key, "=================", value);
    isNaN(value) ? value : value = parseInt(value);
    let result = data.filter((product) => {
        switch (typeof (value)) {
            case "string":
                return product[key].toLowerCase().includes(value.toLowerCase());

            case "number":
                console.log("=========called inside================",product[key]);
                console.log("=========Product================",product);

                return product[key] === value;
        }
    })
    return result;
}

export const priceFilter = (products, key, value) => {
    const { lte, gte } = value;

    let result = products.filter((product) => {
        if (lte) {
            return product[key] <= lte
        }
        if (gte) {
            return product[key] >= gte
        }
    })
    return result;
}


export const filter = (data, query) => {
    for (const [key, value] of Object.entries(query)) {
        switch (typeof (value)) {
            case "string":
                data = search(data, key, value)
                break;
            case "object":
                data = priceFilter(data, key, value)
                break;
        }
    }
    return data;
}

export const pagination = (data, limit, page) => {
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    return data.slice(startIndex, endIndex);

}