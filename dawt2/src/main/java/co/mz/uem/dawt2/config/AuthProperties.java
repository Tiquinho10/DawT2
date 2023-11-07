package co.mz.uem.dawt2.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("auth")
public class AuthProperties {

    private JksProperties jks;

    public JksProperties getJks() {
        return jks;
    }

    public void setJks(JksProperties jks){
        this.jks = jks;
    }

    static class JksProperties{
        private String keypass;

        private String storepass;

        private String alias;

        private String path;

        public String getKeypass() {
            return keypass;
        }

        public void setKeypass(String keypass) {
            this.keypass = keypass;
        }

        public String getStorepass() {
            return storepass;
        }

        public void setStorepass(String storepass) {
            this.storepass = storepass;
        }

        public String getAlias() {
            return alias;
        }

        public void setAlias(String alias) {
            this.alias = alias;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }
    }
}

