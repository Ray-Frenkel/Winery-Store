let data;

async function getData() {
    try {
        const response = await fetch('https://api.sampleapis.com/wines/whites');
        const wines = await response.json();
        const wines30 = wines.slice(0, 30);
        // wines is now an array of white wines
        const updatedWines = wines30.map(wine => (
            {
                ...wine,
                slug: wine.id,
                type: "white",
                location: wine.location.split('\n')[0],
                price: Math.floor(Math.random() * (500 - 100 + 1)) + 50


            }));
        data = updatedWines;
    } catch (error) {
        // handle the error
    }
}

await getData();
console.log(data);
export default data;