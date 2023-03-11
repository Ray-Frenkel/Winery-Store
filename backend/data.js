let data;

async function getData() {
    data =
    {
        country: "Portugal",
        location: "Douro Valley",
        winery: ["Quinta do Crasto", "Ramos Pinto", "Quinta do Vale Meão"],
        wine: ["Port", "Douro Red", "Vinho Verde"],
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/PRT.png"


    };
    /*
    try {
        const response = await fetch('https://api.sampleapis.com/wines/whites');
        const wines = await response.json();
        const wines30 = wines.slice(0, 30);
        // wines is now an array of white wines
        const updatedWines = wines.map(wine => (
            {
                ...wine,
                slug: wine.id,
                type: "white",
                location: wine.location.split('\n')[0],
                price: Math.floor(Math.random() * (500 - 100 + 1)) + 50

            }));
        // filter the wines by name "Domaine de La Romanée-Conti" and limit the number of returned wines to 10 or less
        data = updatedWines.filter(wine => wine.winery === "Paul Hobbs").slice(0, 5);
    } catch (error) {
        // handle the error
    }
    */
}

await getData();
console.log(data);
export default data;