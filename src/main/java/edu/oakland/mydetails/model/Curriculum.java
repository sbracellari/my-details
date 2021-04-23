package edu.oakland.mydetails.model;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import lombok.Data;
import org.springframework.jdbc.core.RowMapper;

@Data
public class Curriculum {
  private String degreeStatus;
  private String standing;
  private String college;
  private String degree;
  private String level;
  private List<String> majors;
  private List<String> minors;
  private List<String> concentrations;

  public static RowMapper<Curriculum> mapper =
      (rs, rowNum) -> {
        Curriculum curriculum = new Curriculum();
        curriculum.setDegreeStatus(rs.getString("degree_status"));
        curriculum.setStanding(rs.getString("class_standing"));
        curriculum.setCollege(rs.getString("primary_college"));
        curriculum.setDegree(rs.getString("primary_degree"));
        curriculum.setLevel(rs.getString("primary_level"));

        curriculum.setMajors(
            Stream.of(rs.getString("primary_major"), rs.getString("secondary_major"))
                .filter(Objects::nonNull)
                .collect(toList()));
        curriculum.setMinors(
            Stream.of(rs.getString("primary_minor"), rs.getString("secondary_minor"))
                .filter(Objects::nonNull)
                .collect(toList()));

        curriculum.setConcentrations(
            Stream.of(
                    rs.getString("primary_concentration_1"),
                    rs.getString("secondary_concentration_1"),
                    rs.getString("tertiary_concentration_1"),
                    rs.getString("primary_concentration_2"),
                    rs.getString("secondary_concentration_2"),
                    rs.getString("tertiary_concentration_2"))
                .filter(Objects::nonNull)
                .collect(toList()));

        return curriculum;
      };
}
