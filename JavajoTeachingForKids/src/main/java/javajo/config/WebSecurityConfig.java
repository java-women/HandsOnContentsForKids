package javajo.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * セキュリティ設定を行うクラス.<br>
 *
 * Created by Eriko on 2016/02/10.
 */
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        // CSRF無効化(ハンズオンコンテンツでセキュリティはそこまで気にしたいため)
        http.csrf().disable();

        // HTTPヘッダの設定(iframeを使用可能にする)
        http.headers()
                .frameOptions()
                .sameOrigin()
                .httpStrictTransportSecurity()
                .disable();
    }
}
