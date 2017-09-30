/* @flow */

export function handleFileUpload (
  event: any,
  editFileAction: (file: File) => void,
  editUrlAction: (url: string) => void
) {
  event.preventDefault()

  let reader = new FileReader()

  let file = event.target.files[0]
  console.log(file)
  reader.onloadend = () => {
    console.log(file)
    console.log(reader.result)
    editFileAction(file)
    editUrlAction(reader.result)
  }

  reader.readAsDataURL(file)
}
