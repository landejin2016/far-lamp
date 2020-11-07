
import { Config } from '@/interface/index';

interface ApiFunc {
    (url: string, params: Config = {}, isFile: boolean = false): Config;
  }

  
declare module "vue/types/vue" {
    interface Vue {
        $utils: Config,
        $verify: Config,
        $api: ApiFunc
    }
}