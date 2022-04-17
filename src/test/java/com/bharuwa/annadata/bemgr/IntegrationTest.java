package com.bharuwa.annadata.bemgr;

import com.bharuwa.annadata.bemgr.BackEndManagerApp;
import com.bharuwa.annadata.bemgr.config.EmbeddedMongo;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = BackEndManagerApp.class)
@EmbeddedMongo
public @interface IntegrationTest {
}
