import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class BookFetchService {

    public static String fetchBooksJson() throws Exception {
        StringBuilder json = new StringBuilder("[");

        Connection con = DBConnection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery("select * from book_details");

        while (rs.next()) {
            json.append("{")
                    .append("\"id\":").append(rs.getInt("id")).append(",")
                    .append("\"name\":\"").append(rs.getString("name")).append("\",")
                    .append("\"type\":\"").append(rs.getString("type")).append("\",")
                    .append("\"available\":").append(rs.getBoolean("available"))
                    .append("},");
        }

        if (json.length() > 1) {
            json.deleteCharAt(json.length() - 1);
        }

        json.append("]");

        con.close();

        return json.toString();
    }
}

