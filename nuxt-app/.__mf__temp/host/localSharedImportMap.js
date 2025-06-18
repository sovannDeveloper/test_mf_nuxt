
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "vue": async () => {
          let pkg = await import("__mf__virtual/host__prebuild__vue__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "vue": {
            name: "vue",
            version: "3.5.16",
            scope: ["default"],
            loaded: false,
            from: "host",
            async get () {
              usedShared["vue"].loaded = true
              const {"vue": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^3.5.16"
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "remote",
                  name: "remote",
                  type: "module",
                  entry: "http://localhost:3001/remoteEntry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      