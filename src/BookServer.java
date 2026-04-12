import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.net.InetSocketAddress;

import java.io.*;

public class BookServer {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(4000), 0);

        server.createContext("/books", new BookHandler());

        server.start();
        System.out.println("Server started at 4000");
    }
}

class BookHandler implements HttpHandler {

    public void handle(HttpExchange exchange) throws IOException {

        String response = "";

        try {
            response = BookFetchService.fetchBooksJson();
        } catch (Exception e) {
            e.printStackTrace();
        }

        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

        exchange.sendResponseHeaders(200, response.length());

        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}

