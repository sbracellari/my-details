package edu.oakland.mydetails.model;

import lombok.Data;
import org.springframework.jdbc.core.RowMapper;

@Data
public class Adviser {
  private String name = "N/A";
  private String email = "N/A";

  public static RowMapper<Adviser> mapper =
      (rs, rowNum) -> {
        Adviser adviser = new Adviser();
        adviser.setEmail(rs.getString("adviseremail"));
        adviser.setName(rs.getString("adviser"));

        return adviser;
      };
}
