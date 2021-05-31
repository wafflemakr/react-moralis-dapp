import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Box,
  Table,
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Tfoot,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useMoralisQuery, useMoralis } from "react-moralis";
import notify from "../utils/notify";

export default function Dashboard() {
  const [limit, setLimit] = useState(10);
  const [tokenTransfers, setTokenTransfers] = useState([]);

  const { web3 } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery(
    "PolygonTokenTransfers",
    (query) => query.limit(limit),
    [limit],
    {
      live: "true",
    }
  );

  const {
    data: tokenData,
    error: tokenError,
    isLoading: isDataLoading,
  } = useMoralisQuery(
    "PolygonTokenBalance",
    (query) => query.limit(limit),
    [limit],
    {
      live: "true",
    }
  );

  useEffect(() => {
    if (error) notify("error", "Error", error.message);
    if (tokenError) notify("error", "Error", tokenError.message);
  }, [error, tokenError]);

  useEffect(() => {
    if (data.length > 0 && !isDataLoading && !isLoading) {
      const symbols = {};
      tokenData.forEach((t) => {
        symbols[t.attributes.token_address] = t.attributes.symbol;
      });

      const _transfers = data.map(({ attributes: att }) => {
        return {
          token: att.token_address,
          symbol: symbols[att.token_address] || "",
          amount: Number(web3.utils.fromWei(att.value)).toPrecision(2),
          hash: att.transaction_hash,
        };
      });
      setTokenTransfers(_transfers);
    }
  }, [data, tokenData, web3, isDataLoading, isLoading]);

  return (
    <Container maxW="xl" centerContent>
      <Heading>DASHBOARD PAGE</Heading>

      <Box mt={12}>
        {isLoading ? (
          "Loading..."
        ) : (
          <Table variant="simple" colorScheme="teal">
            <TableCaption>ERC20 token transactions</TableCaption>
            <Thead>
              <Tr>
                <Th>Token</Th>
                <Th>Amount</Th>
                <Th>Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenTransfers.map((t, k) => (
                <Tr key={k}>
                  <Td>{t.symbol}</Td>
                  <Td>{t.amount}</Td>
                  <Td>
                    <Link
                      href={`https://explorer-mainnet.maticvigil.com/tx/${t.hash}`}
                      isExternal
                    >
                      {t.hash.substring(0, 8) +
                        "..." +
                        t.hash.substring(58, 66)}
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Token Address</Th>
                <Th>Amount</Th>
                <Th>Receipt</Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
      </Box>
    </Container>
  );
}
