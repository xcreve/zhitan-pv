declare module 'js-cookie' {
  const Cookies: any
  export default Cookies
}

declare module 'nprogress' {
  const nprogress: any
  export default nprogress
}

declare module 'file-saver' {
  export function saveAs(data: Blob | string, filename?: string, options?: any): void
  export default saveAs
}

declare module 'jsencrypt/bin/jsencrypt.min' {
  const JSEncrypt: any
  export default JSEncrypt
}

declare module 'sortablejs' {
  const Sortable: any
  export default Sortable
}

declare module 'vuedraggable/dist/vuedraggable.common' {
  const draggable: any
  export default draggable
}
