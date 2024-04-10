/** Image to Base64 */
export default function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            // the result attribute contains the data as a data: URL representing the file's data as a base64 encoded string.
            resolve(fileReader.result)
        }

        fileReader.onerror = () => {
            reject(error)
        }
    })
}