package ilirsfuturetas.redu.db;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.HttpURLConnection.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by maram on 2018-03-15.
 */

public class WebService extends AsyncTask<String, Void, String> {
    String server_response;

    @Override
    protected String doInBackground(String... strings) {

        URL url;
        HttpsURLConnection httpsConnection = null;

        try {
            url = new URL("https://cslinux.utm.utoronto.ca/~salamou1/301-redu/index.php");
            //csc301app6   3eivn3i9cjg2img//
            httpsConnection = (HttpsURLConnection) url.openConnection();
            httpsConnection.setRequestMethod("POST");
            //httpsConnection.setRequestProperty("Content-length", "0");


            httpsConnection.setDoInput(true);
            httpsConnection.setDoOutput(true);
            httpsConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");


            Map<String,String> arguments = new HashMap<>();
            arguments.put("myquery", "select * from appuser;");
            arguments.put("myqparams", "stuff");
            StringJoiner sj = new StringJoiner("&");
            for(Map.Entry<String,String> entry : arguments.entrySet())
                sj.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "="
                        + URLEncoder.encode(entry.getValue(), "UTF-8"));



            byte[] out = sj.toString().getBytes(StandardCharsets.UTF_8);
            int length = out.length;
            httpsConnection.setFixedLengthStreamingMode(length);
            httpsConnection.connect();
            try(OutputStream os = httpsConnection.getOutputStream()) {
                os.write(out);
            }


            /*our post is on its way! */
            Log.v("(*****)", "connected");
            int responseCode = httpsConnection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                server_response = readStream(httpsConnection.getInputStream());
                Log.v("GOT SOME RESPONSE", "Test");
                Log.v("***** -> CLIENT RESPONSE ", server_response);
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        Log.e("Response", "" + server_response);


    }

// Converting InputStream to String

    private String readStream(InputStream in) {
        BufferedReader reader = null;
        StringBuffer response = new StringBuffer();
        try {
            reader = new BufferedReader(new InputStreamReader(in));
            String line = "";
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return response.toString();
    }
}