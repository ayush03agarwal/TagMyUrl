import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

/**
 * Created by ayush.agarwal on 25/09/16.
 */
public class FindMyUrl {

    private static String searchPattern = "a~e~c";
    private static String splitChar = "~";
    private static Character replacingUnit = 'a';
    private static HashMap<String, Integer> lookup = new HashMap<>();

    public static void main(String[] args) {
        HashMap<String, String> urlNTags = readFile("/Users/ayush.agarwal/code/TagMyUrl/resources/urls");
        LinkedHashSet<String> permuted = permuteSearchPattern(searchPattern);

        TreeMap<Integer, LinkedHashSet<String>> bestFitUrlsRaw = new TreeMap<>();
        for (Map.Entry<String, String> entry : urlNTags.entrySet()) {
            for (String s : permuted) {
                String splitTags[] = s.split(splitChar);
                boolean tagExists = true;
                for (String tag : splitTags) {
                    if (!entry.getValue().trim().contains(tag)) {
                        tagExists = false;
                        break;
                    }
                }
                if (tagExists) {
                    if (lookup.get(entry.getKey()) == null || lookup.get(entry.getKey()) < s.length()) {
                        put(bestFitUrlsRaw, s.length(), entry.getKey());
                        lookup.put(entry.getKey(), s.length());
                    }
                }
            }
        }

        LinkedHashSet<String> finalUrls = new LinkedHashSet<>();
        for (Map.Entry<Integer, LinkedHashSet<String>> entry : bestFitUrlsRaw.descendingMap().entrySet()) {
            finalUrls.addAll(entry.getValue());
        }

        for (String t : finalUrls) {
            System.out.println(t);
        }
    }

    private static LinkedHashSet<String> permuteSearchPattern(String searchPattern) {
        String[] tags = searchPattern.split(splitChar);
        Map<Character, String> m = new HashMap<>();
        LinkedHashSet<String> permutedList = new LinkedHashSet<>();

        // Representing tags with alphabets.
        for (String t : tags) {
            m.put(replacingUnit++, t.trim());
        }

        Set<Character> keys = m.keySet();
        String replaced = "";
        for (Character key : keys) {
            replaced += key;
        }

        LinkedHashSet<String> permuted = GenerateAllCombinationsOfString.combination(replaced);
        for (String s : permuted) {
            String combination = "";
            for (char ch : s.toCharArray()) {
                combination += m.get(ch) + splitChar;
            }
            combination = combination.substring(0, combination.length() - 1);
            permutedList.add(combination);
        }
        return permutedList;
    }

    private static HashMap<String, String> readFile(String location) {
        BufferedReader br = null;
        HashMap<String, String> urls = new HashMap<>();
        try {
            String sCurrentLine;
            br = new BufferedReader(new FileReader(location));
            while ((sCurrentLine = br.readLine()) != null) {
                if (!sCurrentLine.isEmpty()) {
                    String tags = sCurrentLine.substring(sCurrentLine.indexOf("[") + 1, sCurrentLine.indexOf("]"));
                    urls.put(sCurrentLine.substring(0, sCurrentLine.indexOf("[")), tags);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) br.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return urls;
    }

    private static void put(TreeMap<Integer, LinkedHashSet<String>> bestFitUrls, int length, String key) {
        LinkedHashSet<String> lhs = null;
        if (bestFitUrls.get(length) == null) {
            lhs = new LinkedHashSet<>();
        } else {
            lhs = bestFitUrls.get(length);
        }
        lhs.add(key);
        bestFitUrls.put(length, lhs);
    }
}
