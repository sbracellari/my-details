package edu.oakland.mydetails;

import org.apereo.portal.soffit.renderer.SoffitApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"edu.oakland.soffit.auth", "edu.oakland.mydetails"})
@SoffitApplication
@SpringBootApplication
public class MyDetailsApplication {
  public static void main(String[] args) {
    SpringApplication.run(MyDetailsApplication.class, args);
  }
}
