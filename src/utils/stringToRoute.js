export default function stringToRoute(value) {
    return value.toLocaleLowerCase().replace(/[^\w\s]/gi, '').split(" ").join("-");
}