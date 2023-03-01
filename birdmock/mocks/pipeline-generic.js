module.exports = {
  '/elyra/pipeline/components/local': () => {
    return {
      version: '3.0',
      categories: [
        {
          id: 'Elyra',
          label: '节点',
          node_types: [
            {
              op: 'execute-notebook-node',
              description: 'Run notebook file',
              id: 'notebook',
              image: '',
              label: 'Notebook',
              type: 'execution_node',
              inputs: [
                {
                  id: 'inPort',
                  app_data: {
                    ui_data: {
                      cardinality: { min: 0, max: -1 },
                      label: 'Input Port'
                    }
                  }
                }
              ],
              outputs: [
                {
                  id: 'outPort',
                  app_data: {
                    ui_data: {
                      cardinality: { min: 0, max: -1 },
                      label: 'Output Port'
                    }
                  }
                }
              ],
              parameters: {},
              app_data: {
                extensions: ['.ipynb'],
                parameter_refs: { filehandler: 'filename' },
                image: '',
                ui_data: {
                  description: '拖拽添加 Notebook 节点',
                  label: 'Notebook',
                  image: '',
                  x_pos: 0,
                  y_pos: 0
                }
              }
            },
            {
              op: 'execute-python-node',
              description: 'Run Python script',
              id: 'python-script',
              image: '',
              label: 'Python Script',
              type: 'execution_node',
              inputs: [
                {
                  id: 'inPort',
                  app_data: {
                    ui_data: {
                      cardinality: { min: 0, max: -1 },
                      label: 'Input Port'
                    }
                  }
                }
              ],
              outputs: [
                {
                  id: 'outPort',
                  app_data: {
                    ui_data: {
                      cardinality: { min: 0, max: -1 },
                      label: 'Output Port'
                    }
                  }
                }
              ],
              parameters: {},
              app_data: {
                extensions: ['.py'],
                parameter_refs: { filehandler: 'filename' },
                image: '',
                ui_data: {
                  description: '拖拽添加 Python 节点',
                  label: 'Python Script',
                  image: '',
                  x_pos: 0,
                  y_pos: 0
                }
              }
            },
            {
              op: 'execute-r-node',
              description: 'Run R script',
              id: 'r-script',
              image: '',
              label: 'R Script',
              type: 'execution_node',
              inputs: [
                {
                  id: 'inPort',
                  app_data: {
                    ui_data: {
                      cardinality: { min: 0, max: -1 },
                      label: 'Input Port'
                    }
                  }
                }
              ],
              outputs: [
                {
                  id: 'outPort',
                  app_data: {
                    ui_data: {
                      cardinality: { min: 0, max: -1 },
                      label: 'Output Port'
                    }
                  }
                }
              ],
              parameters: {},
              app_data: {
                extensions: ['.r'],
                parameter_refs: { filehandler: 'filename' },
                image: '',
                ui_data: {
                  description: '拖拽添加 R 节点',
                  label: 'R Script',
                  image: '',
                  x_pos: 0,
                  y_pos: 0
                }
              }
            }
          ]
        }
      ]
    };
  },
  '/elyra/pipeline/local/properties': () => {
    return {
      type: 'object',
      properties: {
        name: {
          title: '管道名称',
          type: 'string',
          uihints: { 'ui:readonly': true }
        },
        runtime: {
          title: '管道运行环境',
          type: 'string',
          uihints: { 'ui:readonly': true }
        },
        description: {
          title: '管道描述',
          type: 'string',
          uihints: {
            'ui:placeholder': '管道描述',
            'ui:widget': 'textarea'
          }
        },
        pipeline_defaults: {
          type: 'object',
          properties: {
            cos_object_prefix: {
              title: '对象存储路径前缀',
              type: 'string',
              description:
                '对于通用组件，在对象存储中存储工件时使用此路径前缀.',
              uihints: { 'ui:placeholder': 'project/subproject' }
            },
            node_defaults_header: {
              type: 'null',
              title: '节点默认值',
              description:
                '默认值应用于该管道中的所有节点，并且可以在每个节点中自定义.',
              uihints: { 'ui:field': 'header' }
            },
            kubernetes_tolerations: {
              title: 'Kubernetes Tolerations',
              description: 'Kubernetes 容忍应用于执行节点的 Pod.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  operator: {
                    title: 'Operator',
                    type: 'string',
                    default: 'Equal',
                    enum: ['Equal', 'Exists']
                  },
                  value: { title: 'Value', type: 'string', default: '' },
                  effect: {
                    title: 'Effect',
                    type: 'string',
                    default: '',
                    enum: [
                      '',
                      'NoExecute(不执行)',
                      'NoSchedule(不调度)',
                      'PreferNoSchedule(偏向于不调度)'
                    ]
                  }
                },
                required: ['operator']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'key' },
                  value: { 'ui:placeholder': 'value' },
                  effect: { 'ui:placeholder': 'NoSchedule' }
                }
              }
            },
            mounted_volumes: {
              title: '数据卷',
              description:
                '该节点上需要挂载的卷。指定的持久卷声明必须存在于执行节点的Kubernetes名称空间中，否则该节点将无法运行.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  path: { title: '挂载路径', type: 'string', default: '' },
                  pvc_name: {
                    title: '持久卷获取名称',
                    type: 'string',
                    default: ''
                  },
                  sub_path: { title: '子路径', type: 'string', default: '' },
                  read_only: {
                    title: '挂载卷只读',
                    type: 'boolean',
                    default: false
                  }
                },
                required: ['path', 'pvc_name']
              },
              uihints: {
                items: {
                  path: { 'ui:placeholder': '/mount/path' },
                  pvc_name: { 'ui:placeholder': 'pvc-name' },
                  sub_path: { 'ui:placeholder': 'relative/path/within/volume' },
                  read_only: { 'ui:placeholder': ' ' }
                }
              }
            },
            kubernetes_pod_annotations: {
              title: 'Kubernetes Pod 注解',
              description:
                '需要添加到该节点的元数据。元数据在执行该节点的 Kubernetes pod 中作为注释公开.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'annotation_key' },
                  value: { 'ui:placeholder': 'annotation_value' }
                }
              }
            },
            kubernetes_pod_labels: {
              title: 'Kubernetes Pod 标签',
              description:
                '需要添加到该节点的元数据。元数据在执行该节点的 Kubernetes pod 中作为标签公开.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'label_key' },
                  value: { 'ui:placeholder': 'label_value' }
                }
              }
            },
            kubernetes_shared_mem_size: {
              title: '共享内存大小',
              description:
                '为执行节点的pod配置自定义共享内存大小，单位为千兆字节(10^9字节)。如果size属性值是大于零的数字，则分配自定义值.',
              type: 'object',
              properties: {
                size: { title: '内存大小 (GB)', type: 'integer', minimum: 0 }
              },
              required: [],
              uihints: { size: { 'ui:placeholder': 0 } }
            },
            generic_node_defaults_header: {
              type: 'null',
              title: '通用节点默认值',
              description:
                '默认值应用于此管道中的所有通用节点，并且可以在每个节点中自定义.',
              uihints: { 'ui:field': 'header' }
            },
            runtime_image: {
              title: '运行时镜像',
              description: '容器镜像用作执行环境.',
              type: 'string'
            },
            env_vars: {
              title: '环境变量',
              description: '要在执行环境上设置的环境变量.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: '环境变量',
                    type: 'string',
                    default: ''
                  },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['env_var']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  value: { 'ui:placeholder': 'value' }
                },
                canRefresh: true
              }
            },
            kubernetes_secrets: {
              title: 'Kubernetes 秘钥',
              description:
                'Kubernetes的秘钥可以作为环境变量提供给这个节点。所给出的秘钥名称和密钥必须出现在执行节点的Kubernetes名称空间中，否则该节点将无法运行.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: '环境变量',
                    type: 'string',
                    default: ''
                  },
                  name: { title: 'Secret Name', type: 'string', default: '' },
                  key: { title: 'Secret Key', type: 'string', default: '' }
                },
                required: ['env_var', 'name', 'key']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  name: { 'ui:placeholder': 'secret-name' },
                  key: { 'ui:placeholder': 'secret-key' }
                }
              }
            },
            custom_node_defaults_header: {
              type: 'null',
              title: '自定义节点默认值',
              description:
                '默认值应用于该管道中的所有自定义节点，并且可以在每个节点中自定义.',
              uihints: { 'ui:field': 'header' }
            },
            disable_node_caching: {
              title: '禁用节点缓存',
              description: '禁用缓存以强制在目标运行时环境中重新执行节点.',
              type: 'string',
              enum: ['True', 'False'],
              uihints: { 'ui:placeholder': '使用运行时默认值' }
            }
          }
        }
      }
    };
  },
  '/elyra/pipeline/local/parameters': () => {
    return {
      message:
        "Runtime processor type 'Local' does not support pipeline parameters."
    };
  },
  '/elyra/pipeline/components/local/notebook/properties': () => {
    return {
      type: 'object',
      properties: {
        label: {
          title: 'Label',
          description: 'A custom label for the node.',
          type: 'string'
        },
        component_parameters: {
          type: 'object',
          properties: {
            inputs_header: {
              type: 'null',
              title: 'Inputs',
              description: 'Input properties for this component.',
              uihints: { 'ui:field': 'header' }
            },
            filename: {
              type: 'string',
              title: 'Filename',
              description: 'The path to the Notebook.',
              uihints: { 'ui:widget': 'file', extensions: ['.ipynb'] }
            },
            runtime_image: {
              type: 'string',
              title: 'Runtime Image',
              required: true,
              description: 'Container image used as execution environment.',
              uihints: { items: [] }
            },
            cpu: {
              type: 'integer',
              title: 'CPU',
              description:
                'For CPU-intensive workloads, you can choose more than 1 CPU (e.g. 1.5).',
              minimum: 0
            },
            memory: {
              type: 'integer',
              title: 'RAM(GB)',
              description: 'The total amount of RAM specified.',
              minimum: 0
            },
            gpu: {
              type: 'integer',
              title: 'GPU',
              description:
                'For GPU-intensive workloads, you can choose more than 1 GPU. Must be an integer.',
              minimum: 0
            },
            gpu_vendor: {
              type: 'string',
              title: 'GPU Vendor',
              description:
                "GPU Vendor, or K8s GPU resource type, default 'nvidia.com/gpu'.",
              uihints: { 'ui:placeholder': 'nvidia.com/gpu' }
            },
            dependencies: {
              title: 'File Dependencies',
              description:
                'Local file dependencies that need to be copied to remote execution environment.',
              type: 'array',
              items: { type: 'string', default: '' },
              default: [],
              uihints: { files: true, items: { 'ui:placeholder': '*.py' } }
            },
            include_subdirectories: {
              type: 'boolean',
              title: 'Include Subdirectories',
              description:
                'Recursively include subdirectories when submitting a pipeline (This may increase submission time).',
              default: false
            },
            outputs_header: {
              type: 'null',
              title: 'Outputs',
              description: 'Outputs produced by this component.',
              uihints: { 'ui:field': 'header' }
            },
            outputs: {
              title: 'Output Files',
              description:
                'Files generated during execution that will become available to all subsequent pipeline steps.',
              type: 'array',
              items: { type: 'string', default: '' },
              default: [],
              uihints: { items: { 'ui:placeholder': '*.csv' } }
            },
            additional_properties_header: {
              type: 'null',
              title: 'Additional Properties',
              description:
                'Additional properties used by Elyra that are not given in the component definition.',
              uihints: { 'ui:field': 'header' }
            },
            env_vars: {
              title: 'Environment Variables',
              description:
                'Environment variables to be set on the execution environment.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: 'Environment Variable',
                    type: 'string',
                    default: ''
                  },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['env_var']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  value: { 'ui:placeholder': 'value' }
                },
                canRefresh: true
              }
            },
            kubernetes_pod_annotations: {
              title: 'Kubernetes Pod Annotations',
              description:
                'Metadata to be added to this node. The metadata is exposed as annotation in the Kubernetes pod that executes this node.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'annotation_key' },
                  value: { 'ui:placeholder': 'annotation_value' }
                }
              }
            },
            kubernetes_pod_labels: {
              title: 'Kubernetes Pod Labels',
              description:
                'Metadata to be added to this node. The metadata is exposed as label in the Kubernetes pod that executes this node.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'label_key' },
                  value: { 'ui:placeholder': 'label_value' }
                }
              }
            },
            kubernetes_secrets: {
              title: 'Kubernetes Secrets',
              description:
                'Kubernetes secrets to make available as environment variables to this node. The secret name and key given must be present in the Kubernetes namespace where the node is executed or this node will not run.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: 'Environment Variable',
                    type: 'string',
                    default: ''
                  },
                  name: { title: 'Secret Name', type: 'string', default: '' },
                  key: { title: 'Secret Key', type: 'string', default: '' }
                },
                required: ['env_var', 'name', 'key']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  name: { 'ui:placeholder': 'secret-name' },
                  key: { 'ui:placeholder': 'secret-key' }
                }
              }
            },
            kubernetes_shared_mem_size: {
              title: 'Shared Memory Size',
              description:
                'Configure a custom shared memory size in gigabytes (10^9 bytes) for the pod that executes a node. A custom value is assigned if the size property value is a number greater than zero.',
              type: 'object',
              properties: {
                size: { title: 'Memory Size (GB)', type: 'integer', minimum: 0 }
              },
              required: [],
              uihints: { size: { 'ui:placeholder': 0 } }
            },
            kubernetes_tolerations: {
              title: 'Kubernetes Tolerations',
              description:
                'Kubernetes tolerations to apply to the pod where the node is executed.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  operator: {
                    title: 'Operator',
                    type: 'string',
                    default: 'Equal',
                    enum: ['Equal', 'Exists']
                  },
                  value: { title: 'Value', type: 'string', default: '' },
                  effect: {
                    title: 'Effect',
                    type: 'string',
                    default: '',
                    enum: ['', 'NoExecute', 'NoSchedule', 'PreferNoSchedule']
                  }
                },
                required: ['operator']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'key' },
                  value: { 'ui:placeholder': 'value' },
                  effect: { 'ui:placeholder': 'NoSchedule' }
                }
              }
            },
            mounted_volumes: {
              title: 'Data Volumes',
              description:
                'Volumes to be mounted in this node. The specified Persistent Volume Claims must exist in the Kubernetes namespace where the node is executed or this node will not run.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  path: { title: 'Mount Path', type: 'string', default: '' },
                  pvc_name: {
                    title: 'Persistent Volume Claim Name',
                    type: 'string',
                    default: ''
                  },
                  sub_path: { title: 'Sub Path', type: 'string', default: '' },
                  read_only: {
                    title: 'Mount volume read-only',
                    type: 'boolean',
                    default: false
                  }
                },
                required: ['path', 'pvc_name']
              },
              uihints: {
                items: {
                  path: { 'ui:placeholder': '/mount/path' },
                  pvc_name: { 'ui:placeholder': 'pvc-name' },
                  sub_path: { 'ui:placeholder': 'relative/path/within/volume' },
                  read_only: { 'ui:placeholder': ' ' }
                }
              }
            }
          },
          required: ['filename', 'runtime_image']
        }
      },
      required: ['component_parameters']
    };
  },
  '/elyra/pipeline/components/local/python-script/properties': () => {
    return {
      type: 'object',
      properties: {
        label: {
          title: 'Label',
          description: 'A custom label for the node.',
          type: 'string'
        },
        component_parameters: {
          type: 'object',
          properties: {
            inputs_header: {
              type: 'null',
              title: 'Inputs',
              description: 'Input properties for this component.',
              uihints: { 'ui:field': 'header' }
            },
            filename: {
              type: 'string',
              title: 'Filename',
              description: 'The path to the Python Script.',
              uihints: { 'ui:widget': 'file', extensions: ['.py'] }
            },
            runtime_image: {
              type: 'string',
              title: 'Runtime Image',
              required: true,
              description: 'Container image used as execution environment.',
              uihints: { items: [] }
            },
            cpu: {
              type: 'integer',
              title: 'CPU',
              description:
                'For CPU-intensive workloads, you can choose more than 1 CPU (e.g. 1.5).',
              minimum: 0
            },
            memory: {
              type: 'integer',
              title: 'RAM(GB)',
              description: 'The total amount of RAM specified.',
              minimum: 0
            },
            gpu: {
              type: 'integer',
              title: 'GPU',
              description:
                'For GPU-intensive workloads, you can choose more than 1 GPU. Must be an integer.',
              minimum: 0
            },
            gpu_vendor: {
              type: 'string',
              title: 'GPU Vendor',
              description:
                "GPU Vendor, or K8s GPU resource type, default 'nvidia.com/gpu'.",
              uihints: { 'ui:placeholder': 'nvidia.com/gpu' }
            },
            dependencies: {
              title: 'File Dependencies',
              description:
                'Local file dependencies that need to be copied to remote execution environment.',
              type: 'array',
              items: { type: 'string', default: '' },
              default: [],
              uihints: { files: true, items: { 'ui:placeholder': '*.py' } }
            },
            include_subdirectories: {
              type: 'boolean',
              title: 'Include Subdirectories',
              description:
                'Recursively include subdirectories when submitting a pipeline (This may increase submission time).',
              default: false
            },
            outputs_header: {
              type: 'null',
              title: 'Outputs',
              description: 'Outputs produced by this component.',
              uihints: { 'ui:field': 'header' }
            },
            outputs: {
              title: 'Output Files',
              description:
                'Files generated during execution that will become available to all subsequent pipeline steps.',
              type: 'array',
              items: { type: 'string', default: '' },
              default: [],
              uihints: { items: { 'ui:placeholder': '*.csv' } }
            },
            additional_properties_header: {
              type: 'null',
              title: 'Additional Properties',
              description:
                'Additional properties used by Elyra that are not given in the component definition.',
              uihints: { 'ui:field': 'header' }
            },
            env_vars: {
              title: 'Environment Variables',
              description:
                'Environment variables to be set on the execution environment.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: 'Environment Variable',
                    type: 'string',
                    default: ''
                  },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['env_var']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  value: { 'ui:placeholder': 'value' }
                },
                canRefresh: true
              }
            },
            kubernetes_pod_annotations: {
              title: 'Kubernetes Pod Annotations',
              description:
                'Metadata to be added to this node. The metadata is exposed as annotation in the Kubernetes pod that executes this node.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'annotation_key' },
                  value: { 'ui:placeholder': 'annotation_value' }
                }
              }
            },
            kubernetes_pod_labels: {
              title: 'Kubernetes Pod Labels',
              description:
                'Metadata to be added to this node. The metadata is exposed as label in the Kubernetes pod that executes this node.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'label_key' },
                  value: { 'ui:placeholder': 'label_value' }
                }
              }
            },
            kubernetes_secrets: {
              title: 'Kubernetes Secrets',
              description:
                'Kubernetes secrets to make available as environment variables to this node. The secret name and key given must be present in the Kubernetes namespace where the node is executed or this node will not run.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: 'Environment Variable',
                    type: 'string',
                    default: ''
                  },
                  name: { title: 'Secret Name', type: 'string', default: '' },
                  key: { title: 'Secret Key', type: 'string', default: '' }
                },
                required: ['env_var', 'name', 'key']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  name: { 'ui:placeholder': 'secret-name' },
                  key: { 'ui:placeholder': 'secret-key' }
                }
              }
            },
            kubernetes_shared_mem_size: {
              title: 'Shared Memory Size',
              description:
                'Configure a custom shared memory size in gigabytes (10^9 bytes) for the pod that executes a node. A custom value is assigned if the size property value is a number greater than zero.',
              type: 'object',
              properties: {
                size: { title: 'Memory Size (GB)', type: 'integer', minimum: 0 }
              },
              required: [],
              uihints: { size: { 'ui:placeholder': 0 } }
            },
            kubernetes_tolerations: {
              title: 'Kubernetes Tolerations',
              description:
                'Kubernetes tolerations to apply to the pod where the node is executed.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  operator: {
                    title: 'Operator',
                    type: 'string',
                    default: 'Equal',
                    enum: ['Equal', 'Exists']
                  },
                  value: { title: 'Value', type: 'string', default: '' },
                  effect: {
                    title: 'Effect',
                    type: 'string',
                    default: '',
                    enum: ['', 'NoExecute', 'NoSchedule', 'PreferNoSchedule']
                  }
                },
                required: ['operator']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'key' },
                  value: { 'ui:placeholder': 'value' },
                  effect: { 'ui:placeholder': 'NoSchedule' }
                }
              }
            },
            mounted_volumes: {
              title: 'Data Volumes',
              description:
                'Volumes to be mounted in this node. The specified Persistent Volume Claims must exist in the Kubernetes namespace where the node is executed or this node will not run.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  path: { title: 'Mount Path', type: 'string', default: '' },
                  pvc_name: {
                    title: 'Persistent Volume Claim Name',
                    type: 'string',
                    default: ''
                  },
                  sub_path: { title: 'Sub Path', type: 'string', default: '' },
                  read_only: {
                    title: 'Mount volume read-only',
                    type: 'boolean',
                    default: false
                  }
                },
                required: ['path', 'pvc_name']
              },
              uihints: {
                items: {
                  path: { 'ui:placeholder': '/mount/path' },
                  pvc_name: { 'ui:placeholder': 'pvc-name' },
                  sub_path: { 'ui:placeholder': 'relative/path/within/volume' },
                  read_only: { 'ui:placeholder': ' ' }
                }
              }
            }
          },
          required: ['filename', 'runtime_image']
        }
      },
      required: ['component_parameters']
    };
  },
  '/elyra/pipeline/components/local/r-script/properties': () => {
    return {
      type: 'object',
      properties: {
        label: {
          title: 'Label',
          description: 'A custom label for the node.',
          type: 'string'
        },
        component_parameters: {
          type: 'object',
          properties: {
            inputs_header: {
              type: 'null',
              title: 'Inputs',
              description: 'Input properties for this component.',
              uihints: { 'ui:field': 'header' }
            },
            filename: {
              type: 'string',
              title: 'Filename',
              description: 'The path to the R Script.',
              uihints: { 'ui:widget': 'file', extensions: ['.r'] }
            },
            runtime_image: {
              type: 'string',
              title: 'Runtime Image',
              required: true,
              description: 'Container image used as execution environment.',
              uihints: { items: [] }
            },
            cpu: {
              type: 'integer',
              title: 'CPU',
              description:
                'For CPU-intensive workloads, you can choose more than 1 CPU (e.g. 1.5).',
              minimum: 0
            },
            memory: {
              type: 'integer',
              title: 'RAM(GB)',
              description: 'The total amount of RAM specified.',
              minimum: 0
            },
            gpu: {
              type: 'integer',
              title: 'GPU',
              description:
                'For GPU-intensive workloads, you can choose more than 1 GPU. Must be an integer.',
              minimum: 0
            },
            gpu_vendor: {
              type: 'string',
              title: 'GPU Vendor',
              description:
                "GPU Vendor, or K8s GPU resource type, default 'nvidia.com/gpu'.",
              uihints: { 'ui:placeholder': 'nvidia.com/gpu' }
            },
            dependencies: {
              title: 'File Dependencies',
              description:
                'Local file dependencies that need to be copied to remote execution environment.',
              type: 'array',
              items: { type: 'string', default: '' },
              default: [],
              uihints: { files: true, items: { 'ui:placeholder': '*.py' } }
            },
            include_subdirectories: {
              type: 'boolean',
              title: 'Include Subdirectories',
              description:
                'Recursively include subdirectories when submitting a pipeline (This may increase submission time).',
              default: false
            },
            outputs_header: {
              type: 'null',
              title: 'Outputs',
              description: 'Outputs produced by this component.',
              uihints: { 'ui:field': 'header' }
            },
            outputs: {
              title: 'Output Files',
              description:
                'Files generated during execution that will become available to all subsequent pipeline steps.',
              type: 'array',
              items: { type: 'string', default: '' },
              default: [],
              uihints: { items: { 'ui:placeholder': '*.csv' } }
            },
            additional_properties_header: {
              type: 'null',
              title: 'Additional Properties',
              description:
                'Additional properties used by Elyra that are not given in the component definition.',
              uihints: { 'ui:field': 'header' }
            },
            env_vars: {
              title: 'Environment Variables',
              description:
                'Environment variables to be set on the execution environment.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: 'Environment Variable',
                    type: 'string',
                    default: ''
                  },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['env_var']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  value: { 'ui:placeholder': 'value' }
                },
                canRefresh: true
              }
            },
            kubernetes_pod_annotations: {
              title: 'Kubernetes Pod Annotations',
              description:
                'Metadata to be added to this node. The metadata is exposed as annotation in the Kubernetes pod that executes this node.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'annotation_key' },
                  value: { 'ui:placeholder': 'annotation_value' }
                }
              }
            },
            kubernetes_pod_labels: {
              title: 'Kubernetes Pod Labels',
              description:
                'Metadata to be added to this node. The metadata is exposed as label in the Kubernetes pod that executes this node.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  value: { title: 'Value', type: 'string', default: '' }
                },
                required: ['key']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'label_key' },
                  value: { 'ui:placeholder': 'label_value' }
                }
              }
            },
            kubernetes_secrets: {
              title: 'Kubernetes Secrets',
              description:
                'Kubernetes secrets to make available as environment variables to this node. The secret name and key given must be present in the Kubernetes namespace where the node is executed or this node will not run.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  env_var: {
                    title: 'Environment Variable',
                    type: 'string',
                    default: ''
                  },
                  name: { title: 'Secret Name', type: 'string', default: '' },
                  key: { title: 'Secret Key', type: 'string', default: '' }
                },
                required: ['env_var', 'name', 'key']
              },
              uihints: {
                items: {
                  env_var: { 'ui:placeholder': 'ENV_VAR' },
                  name: { 'ui:placeholder': 'secret-name' },
                  key: { 'ui:placeholder': 'secret-key' }
                }
              }
            },
            kubernetes_shared_mem_size: {
              title: 'Shared Memory Size',
              description:
                'Configure a custom shared memory size in gigabytes (10^9 bytes) for the pod that executes a node. A custom value is assigned if the size property value is a number greater than zero.',
              type: 'object',
              properties: {
                size: { title: 'Memory Size (GB)', type: 'integer', minimum: 0 }
              },
              required: [],
              uihints: { size: { 'ui:placeholder': 0 } }
            },
            kubernetes_tolerations: {
              title: 'Kubernetes Tolerations',
              description:
                'Kubernetes tolerations to apply to the pod where the node is executed.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  key: { title: 'Key', type: 'string', default: '' },
                  operator: {
                    title: 'Operator',
                    type: 'string',
                    default: 'Equal',
                    enum: ['Equal', 'Exists']
                  },
                  value: { title: 'Value', type: 'string', default: '' },
                  effect: {
                    title: 'Effect',
                    type: 'string',
                    default: '',
                    enum: ['', 'NoExecute', 'NoSchedule', 'PreferNoSchedule']
                  }
                },
                required: ['operator']
              },
              uihints: {
                items: {
                  key: { 'ui:placeholder': 'key' },
                  value: { 'ui:placeholder': 'value' },
                  effect: { 'ui:placeholder': 'NoSchedule' }
                }
              }
            },
            mounted_volumes: {
              title: 'Data Volumes',
              description:
                'Volumes to be mounted in this node. The specified Persistent Volume Claims must exist in the Kubernetes namespace where the node is executed or this node will not run.',
              type: 'array',
              default: [],
              items: {
                type: 'object',
                properties: {
                  path: { title: 'Mount Path', type: 'string', default: '' },
                  pvc_name: {
                    title: 'Persistent Volume Claim Name',
                    type: 'string',
                    default: ''
                  },
                  sub_path: { title: 'Sub Path', type: 'string', default: '' },
                  read_only: {
                    title: 'Mount volume read-only',
                    type: 'boolean',
                    default: false
                  }
                },
                required: ['path', 'pvc_name']
              },
              uihints: {
                items: {
                  path: { 'ui:placeholder': '/mount/path' },
                  pvc_name: { 'ui:placeholder': 'pvc-name' },
                  sub_path: { 'ui:placeholder': 'relative/path/within/volume' },
                  read_only: { 'ui:placeholder': ' ' }
                }
              }
            }
          },
          required: ['filename', 'runtime_image']
        }
      },
      required: ['component_parameters']
    };
  }
};
