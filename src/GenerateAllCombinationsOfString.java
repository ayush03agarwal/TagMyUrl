import java.util.LinkedHashSet;

/**
 * Created by ayush.agarwal on 25/09/16.
 */

public class GenerateAllCombinationsOfString {

    private static LinkedHashSet<String> premuted = new LinkedHashSet<>();
    private static StringBuilder output = new StringBuilder();
    private static String inputstring;

    public static LinkedHashSet<String> combination(String str) {
        inputstring = str;
        return combination(0);
    }

    private static LinkedHashSet<String> combination(int start) {
        for (int i = start; i < inputstring.length(); ++i) {
            output.append(inputstring.charAt(i));
            premuted.add(output.toString());
            if (i < inputstring.length())
                combination(i + 1);
            output.setLength(output.length() - 1);
        }
        return premuted;
    }
}