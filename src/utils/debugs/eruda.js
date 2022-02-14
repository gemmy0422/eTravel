if(process.env.NODE_ENV === 'development'){
  import('eruda').then(eruda => {
    eruda.default.init({
      tool: ['console', 'sources', 'network', 'info', 'resources']
    })
  })
}