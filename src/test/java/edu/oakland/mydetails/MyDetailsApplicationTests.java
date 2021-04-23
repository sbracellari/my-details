package edu.oakland.mydetails;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.oakland.mydetails.service.BannerService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MyDetailsApplicationTests {

  @Autowired private BannerService service;

  private final String nullPrefName = null;
  private final String longPrefName =
      "ajffcbsutiglshfuvhalcnfuslgyjshvuskvbghskfycbjfkgyshfbgscjfsns";
  private final String shortPrefName = "";
  private final String badPrefName = "bitch";
  private final String regexPrefName = "Grac3!";
  private final String validPrefName = "J.T.";

  @Test
  public void contextLoads() {}

  @Test
  public void isValidPrefName_nullPrefName() {
    assertFalse(service.checkPreferredName(nullPrefName));
  }

  @Test
  public void isValidPrefName_longPrefName() {
    assertFalse(service.checkPreferredName(longPrefName));
  }

  @Test
  public void isValidPrefName_shortPrefName() {
    assertFalse(service.checkPreferredName(shortPrefName));
  }

  @Test
  public void isValidPrefName_badPrefName() {
    assertFalse(service.checkPreferredName(badPrefName));
  }

  @Test
  public void isValidPrefName_regexPrefName() {
    assertFalse(service.checkPreferredName(regexPrefName));
  }

  @Test
  public void isValidPrefName_validPrefName() {
    assertTrue(service.checkPreferredName(validPrefName));
  }
}
