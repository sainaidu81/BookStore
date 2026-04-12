import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class BookFetchService {

    public String fetchBooks() {
        String sql = "select * from book_details";

        StringBuilder json = new StringBuilder();
        json.append("[");

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            boolean firstRow = true;

            while (rs.next()) {
                if (!firstRow) {
                    json.append(",");
                }
                firstRow = false;

                json.append("{");

                for (int i = 1; i <= columnCount; i++) {
                    if (i > 1) {
                        json.append(",");
                    }

                    String columnName = metaData.getColumnName(i);
                    String value = rs.getString(i);

                    json.append("\"")
                            .append(escapeJson(columnName))
                            .append("\":");

                    if (value == null) {
                        json.append("null");
                    } else {
                        json.append("\"")
                                .append(escapeJson(value))
                                .append("\"");
                    }
                }

                json.append("}");
            }

            json.append("]");
            return json.toString();

        } catch (SQLException e) {
            e.printStackTrace();
            return "[]";
        }
    }

    private String escapeJson(String text) {
        if (text == null) {
            return "";
        }

        return text.replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}
