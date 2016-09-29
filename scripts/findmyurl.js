import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;


    var searchPattern = "a,b,c,d";
    var splitChar = ",";
    var replacingUnit = 'a';

    function main() {
        var urlNTags = {};
        HashMap<String, String> urlNTags = readFile("/Users/ayush.agarwal/code/TaggedUrlAlgo/resources/urls");
        LinkedHashSet<String> permuted = permuteSearchPattern(searchPattern);

        TreeMap<Integer, LinkedHashSet<String>> bestFitUrlsRaw = new TreeMap<>();
        for (Map.Entry<String, String> entry : urlNTags.entrySet()) {
            for (String s : permuted) {
                if (entry.getValue().trim().contains(s)) {
                    put(bestFitUrlsRaw, s.length(), entry.getKey());
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

        int findThemAll = replaced.length();
        while (findThemAll > 0) {
            LinkedHashSet<String> permuted = GenerateAllPermutationOfNBits.permutation(replaced, "", findThemAll);
            for (String s : permuted) {
                String combination = "";
                for (char ch : s.toCharArray()) {
                    combination += m.get(ch) + splitChar;
                }
                combination = combination.substring(0, combination.length() - 1);
                permutedList.add(combination);
            }
            findThemAll--;
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
                String tags = sCurrentLine.substring(sCurrentLine.indexOf("[") + 1, sCurrentLine.indexOf("]"));
                urls.put(sCurrentLine.substring(0, sCurrentLine.indexOf("[")), tags);
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
